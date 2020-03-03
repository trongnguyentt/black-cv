package blackcv.service.impl;

import blackcv.service.CompanyService;
import blackcv.domain.Company;
import blackcv.repository.CompanyRepository;
import blackcv.service.UserService;
import blackcv.service.dto.CompanyDTO;
import blackcv.service.mapper.CompanyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Company}.
 */
@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {

    private final Logger log = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private final CompanyRepository companyRepository;

    private final UserService userService;

    private final CompanyMapper companyMapper;

    public CompanyServiceImpl(CompanyRepository companyRepository, UserService userService, CompanyMapper companyMapper) {
        this.companyRepository = companyRepository;
        this.userService = userService;
        this.companyMapper = companyMapper;
    }

    /**
     * Save a company.
     *
     * @param companyDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CompanyDTO save(CompanyDTO companyDTO) {
        log.debug("Request to save Company : {}", companyDTO);
        companyDTO.setStatus(1);
        Company company = companyMapper.toEntity(companyDTO);
        company = companyRepository.save(company);
        return companyMapper.toDto(company);
    }

    @Override
    public Page<CompanyDTO> findAll(MultiValueMap<String, String> queryParams, Pageable pageable) {
        log.debug("Request to get all CVS");
        List<Company> device = companyRepository.search(queryParams, pageable);
        Page<Company> pages = new PageImpl<>(device, pageable, companyRepository.countCompany(queryParams));
        return pages.map(companyMapper::toDto);
    }

    @Override
    public List<CompanyDTO> checkExist() {
        List<Company> companies = companyRepository.findByCreatedBy(userService.getUserWithAuthorities().get().getLogin());
        log.debug("ten dang nhap: " + userService.getUserWithAuthorities().get().getLogin());
        log.debug("object: " + companies);
        return companyMapper.toDto(companies);
    }

    /**
     * Get all the companies.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */

    /**
     * Get one company by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CompanyDTO> findOne(Long id) {
        log.debug("Request to get Company : {}", id);
        return companyRepository.findById(id)
            .map(companyMapper::toDto);
    }

    /**
     * Delete the company by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Company : {}", id);
        Company company = companyRepository.findById(id).get();
        company.setStatus(0);
        companyRepository.save(company);
//        companyRepository.deleteById(id);
    }
}
