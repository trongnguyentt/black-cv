package blackcv.service.impl;

import blackcv.service.ReasonService;
import blackcv.domain.Reason;
import blackcv.repository.ReasonRepository;
import blackcv.service.dto.ReasonDTO;
import blackcv.service.mapper.ReasonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Reason}.
 */
@Service
@Transactional
public class ReasonServiceImpl implements ReasonService {

    private final Logger log = LoggerFactory.getLogger(ReasonServiceImpl.class);

    private final ReasonRepository reasonRepository;

    private final ReasonMapper reasonMapper;

    public ReasonServiceImpl(ReasonRepository reasonRepository, ReasonMapper reasonMapper) {
        this.reasonRepository = reasonRepository;
        this.reasonMapper = reasonMapper;
    }

    /**
     * Save a reason.
     *
     * @param reasonDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReasonDTO save(ReasonDTO reasonDTO) {
        log.debug("Request to save Reason : {}", reasonDTO);
        Reason reason = reasonMapper.toEntity(reasonDTO);
        reason = reasonRepository.save(reason);
        return reasonMapper.toDto(reason);
    }

    /**
     * Get all the reasons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReasonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Reasons");
        return reasonRepository.findAll(pageable)
            .map(reasonMapper::toDto);
    }


    /**
     * Get one reason by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReasonDTO> findOne(Long id) {
        log.debug("Request to get Reason : {}", id);
        return reasonRepository.findById(id)
            .map(reasonMapper::toDto);
    }

    /**
     * Delete the reason by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reason : {}", id);
        reasonRepository.deleteById(id);
    }
}
