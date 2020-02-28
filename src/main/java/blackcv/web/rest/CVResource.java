package blackcv.web.rest;

import blackcv.service.CVService;
import blackcv.web.rest.errors.BadRequestAlertException;
import blackcv.service.dto.CVDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link blackcv.domain.CV}.
 */
@RestController
@RequestMapping("/api")
public class CVResource {

    private final Logger log = LoggerFactory.getLogger(CVResource.class);

    private static final String ENTITY_NAME = "cV";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CVService cVService;

    public CVResource(CVService cVService) {
        this.cVService = cVService;
    }

    /**
     * {@code POST  /cvs} : Create a new cV.
     *
     * @param cVDTO the cVDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cVDTO, or with status {@code 400 (Bad Request)} if the cV has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cvs")
    public ResponseEntity<CVDTO> createCV(@RequestPart("cV") CVDTO cVDTO,
                                          @RequestParam(value = "avatar", required = false) MultipartFile file,
                                          @RequestParam(value = "fileUploadCV", required = false) MultipartFile file2,
                                          HttpServletRequest request) throws URISyntaxException, IOException {
        log.debug("REST request to save CV : {}", cVDTO);
        if (cVDTO.getId() != null) {
            throw new BadRequestAlertException("A new cV cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String path = request.getSession().getServletContext().getRealPath("/") + "/content/images/";
        File upload = new File(path + file.getOriginalFilename());
        File upload2 = new File(path + file2.getOriginalFilename());
        file.transferTo(upload);
        file2.transferTo(upload2);
        String imagePath = request.getContextPath() + "/content/images/" + file.getOriginalFilename();
        String imagePath2 = request.getContextPath() + "/content/images/" + file2.getOriginalFilename();
        cVDTO.setAvatar(imagePath);
        cVDTO.setFileUploadCV(imagePath2);
        CVDTO result = cVService.save(cVDTO);
        return ResponseEntity.created(new URI("/api/cvs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cvs} : Updates an existing cV.
     *
     * @param cVDTO the cVDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cVDTO,
     * or with status {@code 400 (Bad Request)} if the cVDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cVDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cvs")
    public ResponseEntity<CVDTO> updateCV(@RequestPart("cV") CVDTO cVDTO,
                                          @RequestParam(value = "avatar", required = false) MultipartFile file,
                                          @RequestParam(value = "fileUploadCV", required = false) MultipartFile file2,
                                          HttpServletRequest request) throws URISyntaxException, IOException {
        log.debug("REST request to update CV : {}", cVDTO);
        if (cVDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        String path = request.getSession().getServletContext().getRealPath("/") + "/content/images/";
        File upload = new File(path + file.getOriginalFilename());
        File upload2 = new File(path + file2.getOriginalFilename());
        file.transferTo(upload);
        file2.transferTo(upload2);
        String imagePath = request.getContextPath() + "/content/images/" + file.getOriginalFilename();
        String imagePath2 = request.getContextPath() + "/content/images/" + file2.getOriginalFilename();
        cVDTO.setAvatar(imagePath);
        cVDTO.setFileUploadCV(imagePath2);
        CVDTO result = cVService.save(cVDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cVDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cvs} : get all the cVS.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cVS in body.
     */
    @GetMapping("/cvs")
    public ResponseEntity<List<CVDTO>> getAllCVS(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of CVS");
        Page<CVDTO> page = cVService.findAll(queryParams, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /cvs/:id} : get the "id" cV.
     *
     * @param id the id of the cVDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cVDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cvs/{id}")
    public ResponseEntity<CVDTO> getCV(@PathVariable Long id) {
        log.debug("REST request to get CV : {}", id);
        Optional<CVDTO> cVDTO = cVService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cVDTO);
    }

    /**
     * {@code DELETE  /cvs/:id} : delete the "id" cV.
     *
     * @param id the id of the cVDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cvs/{id}")
    public ResponseEntity<Void> deleteCV(@PathVariable Long id) {
        log.debug("REST request to delete CV : {}", id);
        cVService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
