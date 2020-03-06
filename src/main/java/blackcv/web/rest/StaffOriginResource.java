package blackcv.web.rest;

import blackcv.service.StaffOriginService;
import blackcv.web.rest.errors.BadRequestAlertException;
import blackcv.service.dto.StaffOriginDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link blackcv.domain.StaffOrigin}.
 */
@RestController
@RequestMapping("/api")
public class StaffOriginResource {

    private final Logger log = LoggerFactory.getLogger(StaffOriginResource.class);

    private static final String ENTITY_NAME = "staffOrigin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StaffOriginService staffOriginService;

    public StaffOriginResource(StaffOriginService staffOriginService) {
        this.staffOriginService = staffOriginService;
    }

    /**
     * {@code POST  /staff-origins} : Create a new staffOrigin.
     *
     * @param staffOriginDTO the staffOriginDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new staffOriginDTO, or with status {@code 400 (Bad Request)} if the staffOrigin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/staff-origins")
    public ResponseEntity<StaffOriginDTO> createStaffOrigin(@RequestBody StaffOriginDTO staffOriginDTO) throws URISyntaxException {
        log.debug("REST request to save StaffOrigin : {}", staffOriginDTO);
        if (staffOriginDTO.getId() != null) {
            throw new BadRequestAlertException("A new staffOrigin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StaffOriginDTO result = staffOriginService.save(staffOriginDTO);
        return ResponseEntity.created(new URI("/api/staff-origins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /staff-origins} : Updates an existing staffOrigin.
     *
     * @param staffOriginDTO the staffOriginDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated staffOriginDTO,
     * or with status {@code 400 (Bad Request)} if the staffOriginDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the staffOriginDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/staff-origins")
    public ResponseEntity<StaffOriginDTO> updateStaffOrigin(@RequestBody StaffOriginDTO staffOriginDTO) throws URISyntaxException {
        log.debug("REST request to update StaffOrigin : {}", staffOriginDTO);
        if (staffOriginDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StaffOriginDTO result = staffOriginService.save(staffOriginDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, staffOriginDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /staff-origins} : get all the staffOrigins.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of staffOrigins in body.
     */
    @GetMapping("/staff-origins")
    public List<StaffOriginDTO> getAllStaffOrigins() {
        log.debug("REST request to get all StaffOrigins");
        return staffOriginService.findAll();
    }

    @GetMapping("/staff-origins/{name}/{email}")
    public List<StaffOriginDTO> getAllStaffNameAndEmail(@PathVariable String name, @PathVariable String email) {
        return staffOriginService.listStaffNameAndEmail(name, email);
    }

    /**
     * {@code GET  /staff-origins/:id} : get the "id" staffOrigin.
     *
     * @param id the id of the staffOriginDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the staffOriginDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/staff-origins/{id}")
    public ResponseEntity<StaffOriginDTO> getStaffOrigin(@PathVariable Long id) {
        log.debug("REST request to get StaffOrigin : {}", id);
        Optional<StaffOriginDTO> staffOriginDTO = staffOriginService.findOne(id);
        return ResponseUtil.wrapOrNotFound(staffOriginDTO);
    }

    /**
     * {@code DELETE  /staff-origins/:id} : delete the "id" staffOrigin.
     *
     * @param id the id of the staffOriginDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/staff-origins/{id}")
    public ResponseEntity<Void> deleteStaffOrigin(@PathVariable Long id) {
        log.debug("REST request to delete StaffOrigin : {}", id);
        staffOriginService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
