package blackcv.service.impl;

import blackcv.service.StaffOriginService;
import blackcv.domain.StaffOrigin;
import blackcv.repository.StaffOriginRepository;
import blackcv.service.dto.StaffOriginDTO;
import blackcv.service.mapper.StaffOriginMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link StaffOrigin}.
 */
@Service
@Transactional
public class StaffOriginServiceImpl implements StaffOriginService {

    private final Logger log = LoggerFactory.getLogger(StaffOriginServiceImpl.class);

    private final StaffOriginRepository staffOriginRepository;

    private final StaffOriginMapper staffOriginMapper;

    public StaffOriginServiceImpl(StaffOriginRepository staffOriginRepository, StaffOriginMapper staffOriginMapper) {
        this.staffOriginRepository = staffOriginRepository;
        this.staffOriginMapper = staffOriginMapper;
    }

    /**
     * Save a staffOrigin.
     *
     * @param staffOriginDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StaffOriginDTO save(StaffOriginDTO staffOriginDTO) {
        log.debug("Request to save StaffOrigin : {}", staffOriginDTO);
        StaffOrigin staffOrigin = staffOriginMapper.toEntity(staffOriginDTO);
        staffOrigin = staffOriginRepository.save(staffOrigin);
        return staffOriginMapper.toDto(staffOrigin);
    }

    /**
     * Get all the staffOrigins.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<StaffOriginDTO> findAll() {
        log.debug("Request to get all StaffOrigins");
        return staffOriginRepository.findAll().stream()
            .map(staffOriginMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one staffOrigin by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StaffOriginDTO> findOne(Long id) {
        log.debug("Request to get StaffOrigin : {}", id);
        return staffOriginRepository.findById(id)
            .map(staffOriginMapper::toDto);
    }

    /**
     * Delete the staffOrigin by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StaffOrigin : {}", id);
        staffOriginRepository.deleteById(id);
    }
}
