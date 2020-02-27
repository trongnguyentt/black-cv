package blackcv.service;

import blackcv.service.dto.ReasonListDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import java.util.Optional;

/**
 * Service Interface for managing {@link blackcv.domain.ReasonList}.
 */
public interface ReasonListService {

    /**
     * Save a reasonList.
     *
     * @param reasonListDTO the entity to save.
     * @return the persisted entity.
     */
    ReasonListDTO save(ReasonListDTO reasonListDTO);

    /**
     * Get all the reasonLists.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReasonListDTO> findAll(MultiValueMap<String, String> queryParams, Pageable pageable);


    /**
     * Get the "id" reasonList.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReasonListDTO> findOne(Long id);

    /**
     * Delete the "id" reasonList.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
