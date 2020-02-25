package blackcv.service.impl;

import blackcv.service.CVService;
import blackcv.domain.CV;
import blackcv.repository.CVRepository;
import blackcv.service.dto.CVDTO;
import blackcv.service.mapper.CVMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CV}.
 */
@Service
@Transactional
public class CVServiceImpl implements CVService {

    private final Logger log = LoggerFactory.getLogger(CVServiceImpl.class);

    private final CVRepository cVRepository;

    private final CVMapper cVMapper;

    public CVServiceImpl(CVRepository cVRepository, CVMapper cVMapper) {
        this.cVRepository = cVRepository;
        this.cVMapper = cVMapper;
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
    @Transactional(readOnly = true)
    public Page<CVDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CVS");
        return cVRepository.findAll(pageable)
            .map(cVMapper::toDto);
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
        cVRepository.deleteById(id);
    }
}
