package blackcv.service.impl;

import blackcv.domain.Company;
import blackcv.repository.CompanyRepository;
import blackcv.service.CVService;
import blackcv.domain.CV;
import blackcv.repository.CVRepository;
import blackcv.service.CompanyService;
import blackcv.service.UserService;
import blackcv.service.dto.CVDTO;
import blackcv.service.mapper.CVMapper;
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

/**
 * Service Implementation for managing {@link CV}.
 */
@Service
@Transactional
public class CVServiceImpl implements CVService {

    private final Logger log = LoggerFactory.getLogger(CVServiceImpl.class);

    private final CVRepository cVRepository;

    private final CompanyRepository companyRepository;

    private final CVMapper cVMapper;
    private final CompanyService companyService;

    private final UserService userService;

    public CVServiceImpl(CVRepository cVRepository, CompanyRepository companyRepository, CVMapper cVMapper, UserService userService,CompanyService companyService) {
        this.cVRepository = cVRepository;
        this.companyRepository = companyRepository;
        this.cVMapper = cVMapper;
        this.userService = userService;
        this.companyService=companyService;
    }

    /**
     * Save a cV.
     *
     * @param cVDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CVDTO save(CVDTO cVDTO) {
        log.debug("Request to save CV : {}", cVDTO);
        List<Company> companies = companyRepository.findByCreatedBy(userService.getUserWithAuthorities().get().getLogin());
        if (!companies.isEmpty()) {
            cVDTO.setIdCompany(Math.toIntExact(companies.get(0).getId()));
        }
        cVDTO.setStatus(1);
        CV cV = cVMapper.toEntity(cVDTO);
        cV = cVRepository.save(cV);
        return cVMapper.toDto(cV);
    }

    /**
     * Get all the cVS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<CVDTO> findAll(MultiValueMap<String, String> queryParams, Pageable pageable) {
        log.debug("Request to get all CVS");
        List<CV> device = cVRepository.search(queryParams, pageable);
        Page<CV> pages = new PageImpl<>(device, pageable, cVRepository.countCV(queryParams));
        return pages.map(cVMapper::toDto);
    }

    @Override
    public Page<CVDTO> findInHome(MultiValueMap<String, String> queryParams, Pageable pageable) {
        log.debug("Request to get all CVS");
        List<CVDTO> device = cVMapper.toDto(cVRepository.searchInHome(queryParams, pageable));
        for (CVDTO cvdto : device) {
            Long x = new Long(cvdto.getIdCompany());
            if (companyService.findOne(x).isPresent()) {
                String company = companyService.findOne(x).get().getName();
                cvdto.setCompany(company);
            }
        }
        return new PageImpl<>(device, pageable, cVRepository.countCV(queryParams));
    }

    /**
     * Get one cV by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CVDTO> findOne(Long id) {
        log.debug("Request to get CV : {}", id);
        return cVRepository.findById(id)
            .map(cVMapper::toDto);
    }

    /**
     * Delete the cV by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CV : {}", id);
        CV cv = cVRepository.findById(id).get();
        cv.setStatus(0);
        cVRepository.save(cv);
//        cVRepository.deleteById(id);
    }
}
