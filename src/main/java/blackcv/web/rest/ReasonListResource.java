package blackcv.web.rest;

import blackcv.service.ReasonListService;
import blackcv.web.rest.errors.BadRequestAlertException;
import blackcv.service.dto.ReasonListDTO;

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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link blackcv.domain.ReasonList}.
 */
@RestController
@RequestMapping("/api")
public class ReasonListResource {

    private final Logger log = LoggerFactory.getLogger(ReasonListResource.class);

    private static final String ENTITY_NAME = "reasonList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReasonListService reasonListService;

    public ReasonListResource(ReasonListService reasonListService) {
        this.reasonListService = reasonListService;
    }

    /**
     * {@code POST  /reason-lists} : Create a new reasonList.
     *
     * @param reasonListDTO the reasonListDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reasonListDTO, or with status {@code 400 (Bad Request)} if the reasonList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reason-lists")
    public ResponseEntity<ReasonListDTO> createReasonList(@RequestBody ReasonListDTO reasonListDTO) throws URISyntaxException {
        log.debug("REST request to save ReasonList : {}", reasonListDTO);
        if (reasonListDTO.getId() != null) {
            throw new BadRequestAlertException("A new reasonList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReasonListDTO result = reasonListService.save(reasonListDTO);
        return ResponseEntity.created(new URI("/api/reason-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reason-lists} : Updates an existing reasonList.
     *
     * @param reasonListDTO the reasonListDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reasonListDTO,
     * or with status {@code 400 (Bad Request)} if the reasonListDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reasonListDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reason-lists")
    public ResponseEntity<ReasonListDTO> updateReasonList(@RequestBody ReasonListDTO reasonListDTO) throws URISyntaxException {
        log.debug("REST request to update ReasonList : {}", reasonListDTO);
        if (reasonListDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReasonListDTO result = reasonListService.save(reasonListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reasonListDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reason-lists} : get all the reasonLists.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reasonLists in body.
     */

    @GetMapping("/reason-lists")
    public ResponseEntity<List<ReasonListDTO>> getAllReasonLists(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Companies");
        Page<ReasonListDTO> page = reasonListService.findAll(queryParams, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /reason-lists/:id} : get the "id" reasonList.
     *
     * @param id the id of the reasonListDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reasonListDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reason-lists/{id}")
    public ResponseEntity<ReasonListDTO> getReasonList(@PathVariable Long id) {
        log.debug("REST request to get ReasonList : {}", id);
        Optional<ReasonListDTO> reasonListDTO = reasonListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reasonListDTO);
    }

    /**
     * {@code DELETE  /reason-lists/:id} : delete the "id" reasonList.
     *
     * @param id the id of the reasonListDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reason-lists/{id}")
    public ResponseEntity<Void> deleteReasonList(@PathVariable Long id) {
        log.debug("REST request to delete ReasonList : {}", id);
        reasonListService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
