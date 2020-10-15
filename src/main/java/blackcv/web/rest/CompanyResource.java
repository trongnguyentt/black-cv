package blackcv.web.rest;

import blackcv.config.Constants;
import blackcv.domain.Company;
import blackcv.repository.CompanyRepository;
import blackcv.service.CompanyService;
import blackcv.web.rest.errors.BadRequestAlertException;
import blackcv.service.dto.CompanyDTO;

import blackcv.web.rest.errors.EmailAlreadyUsedException;
import blackcv.web.rest.errors.LoginAlreadyUsedException;
import blackcv.web.rest.errors.NameAlreadyUsedException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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
 * REST controller for managing {@link blackcv.domain.Company}.
 */
@RestController
@RequestMapping("/api")
public class CompanyResource {

    private final Logger log = LoggerFactory.getLogger(CompanyResource.class);

    private static final String ENTITY_NAME = "company";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompanyService companyService;

    private final CompanyRepository companyRepository;

    public CompanyResource(CompanyService companyService, CompanyRepository companyRepository) {
        this.companyService = companyService;
        this.companyRepository = companyRepository;
    }

    /**
     * {@code POST  /companies} : Create a new company.
     *
     * @param companyDTO the companyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new companyDTO, or with status {@code 400 (Bad Request)} if the company has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/companies")
    public ResponseEntity<CompanyDTO> createCompany(@RequestBody CompanyDTO companyDTO) throws URISyntaxException {
        log.debug("REST request to save Company : {}", companyDTO);
        if (companyDTO.getId() != null) {
            throw new BadRequestAlertException("A new company cannot already have an ID", ENTITY_NAME, "idexists");
        } else if (companyRepository.findOneByNameAndStatusGreaterThan(companyDTO.getName().toLowerCase(),0).isPresent()) {
            throw new NameAlreadyUsedException();
        } else if (companyRepository.findOneByEmailIgnoreCaseAndStatusGreaterThan(companyDTO.getEmail(),0).isPresent()) {
            throw new EmailAlreadyUsedException();
        } else{
            CompanyDTO result = companyService.save(companyDTO);
            return ResponseEntity.created(new URI("/api/companies/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
        }
    }

    /**
     * {@code PUT  /companies} : Updates an existing company.
     *
     * @param companyDTO the companyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated companyDTO,
     * or with status {@code 400 (Bad Request)} if the companyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the companyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/companies")
    public ResponseEntity<CompanyDTO> updateCompany(@RequestBody CompanyDTO companyDTO) throws URISyntaxException {
        log.debug("REST request to update Company : {}", companyDTO);
        if (companyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Optional<Company> existingCompany = companyRepository.findOneByNameAndStatusGreaterThan(companyDTO.getName().toLowerCase(),0);
        if (existingCompany.isPresent() && (!existingCompany.get().getId().equals(companyDTO.getId()))) {
            throw new NameAlreadyUsedException();
        }

        existingCompany = companyRepository.findOneByEmailIgnoreCaseAndStatusGreaterThan(companyDTO.getEmail(),0);
        if (existingCompany.isPresent() && (!existingCompany.get().getId().equals(companyDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        CompanyDTO result = companyService.save(companyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, companyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /companies} : get all the companies.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of companies in body.
     */
    @GetMapping("/companies")
    public ResponseEntity<List<CompanyDTO>> getAllCompanies(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Companies");
        Page<CompanyDTO> page = companyService.findAll(queryParams, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/companies/check")
    public ResponseEntity<List<CompanyDTO>> checkExist() {
        return ResponseEntity.ok(companyService.checkExist());
//        if (companyService.checkExist().size() > 0)
//            return true;
//        return false;
    }

    /**
     * {@code GET  /companies/:id} : get the "id" company.
     *
     * @param id the id of the companyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the companyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/companies/{id}")
    public ResponseEntity<CompanyDTO> getCompany(@PathVariable Long id) {
        log.debug("REST request to get Company : {}", id);
        Optional<CompanyDTO> companyDTO = companyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(companyDTO);
    }

//    @GetMapping("/companies/{login}")
//    public ResponseEntity<CompanyDTO> getCompanyByLogin(@PathVariable String login) {
//        Optional<CompanyDTO> companyDTO = companyService.findOneByLogin(login);
//        return ResponseUtil.wrapOrNotFound(companyDTO);
//    }

    /**
     * {@code DELETE  /companies/:id} : delete the "id" company.
     *
     * @param id the id of the companyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/companies/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        log.debug("REST request to delete Company : {}", id);
        companyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
