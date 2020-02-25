package blackcv.service.impl;

import blackcv.service.ReasonListService;
import blackcv.domain.ReasonList;
import blackcv.repository.ReasonListRepository;
import blackcv.service.dto.ReasonListDTO;
import blackcv.service.mapper.ReasonListMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ReasonList}.
 */
@Service
@Transactional
public class ReasonListServiceImpl implements ReasonListService {

    private final Logger log = LoggerFactory.getLogger(ReasonListServiceImpl.class);

    private final ReasonListRepository reasonListRepository;

    private final ReasonListMapper reasonListMapper;

    public ReasonListServiceImpl(ReasonListRepository reasonListRepository, ReasonListMapper reasonListMapper) {
        this.reasonListRepository = reasonListRepository;
        this.reasonListMapper = reasonListMapper;
    }

    /**
     * Save a reasonList.
     *
     * @param reasonListDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ReasonListDTO save(ReasonListDTO reasonListDTO) {
        log.debug("Request to save ReasonList : {}", reasonListDTO);
        ReasonList reasonList = reasonListMapper.toEntity(reasonListDTO);
        reasonList = reasonListRepository.save(reasonList);
        return reasonListMapper.toDto(reasonList);
    }

    /**
     * Get all the reasonLists.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ReasonListDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ReasonLists");
        return reasonListRepository.findAll(pageable)
            .map(reasonListMapper::toDto);
    }


    /**
     * Get one reasonList by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ReasonListDTO> findOne(Long id) {
        log.debug("Request to get ReasonList : {}", id);
        return reasonListRepository.findById(id)
            .map(reasonListMapper::toDto);
    }

    /**
     * Delete the reasonList by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReasonList : {}", id);
        reasonListRepository.deleteById(id);
    }
}
