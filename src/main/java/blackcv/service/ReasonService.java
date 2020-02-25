package blackcv.service;

import blackcv.service.dto.ReasonDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link blackcv.domain.Reason}.
 */
public interface ReasonService {

    /**
     * Save a reason.
     *
     * @param reasonDTO the entity to save.
     * @return the persisted entity.
     */
    ReasonDTO save(ReasonDTO reasonDTO);

    /**
     * Get all the reasons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReasonDTO> findAll(Pageable pageable);


    /**
     * Get the "id" reason.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReasonDTO> findOne(Long id);

    /**
     * Delete the "id" reason.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
