package blackcv.service.impl;

import blackcv.service.ReasonService;
import blackcv.domain.Reason;
import blackcv.repository.ReasonRepository;
import blackcv.service.dto.ReasonDTO;
import blackcv.service.mapper.ReasonMapper;
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
        reasonDTO.setStatus(1);
        Reason reason = reasonMapper.toEntity(reasonDTO);
        reason = reasonRepository.save(reason);
        return reasonMapper.toDto(reason);
    }

    @Override
    public Page<ReasonDTO> findAll(MultiValueMap<String, String> queryParams, Pageable pageable) {
        log.debug("Request to get all Reasons");
        List<Reason> device = reasonRepository.search(queryParams, pageable);
        Page<Reason> pages = new PageImpl<>(device, pageable, reasonRepository.countReason(queryParams));
        return pages.map(reasonMapper::toDto);
    }

    /**
     * Get all the reasons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */

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
        Reason reason = reasonRepository.findById(id).get();
        reason.setStatus(0);
        reasonRepository.save(reason);

//        reasonRepository.deleteById(id);
    }
}
