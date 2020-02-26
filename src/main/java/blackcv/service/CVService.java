package blackcv.service;

import blackcv.service.dto.CVDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import java.util.Optional;

/**
 * Service Interface for managing {@link blackcv.domain.CV}.
 */
public interface CVService {

    /**
     * Save a cV.
     *
     * @param cVDTO the entity to save.
     * @return the persisted entity.
     */
    CVDTO save(CVDTO cVDTO);

    /**
     * Get all the cVS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CVDTO> findAll(MultiValueMap<String, String> queryParams, Pageable pageable);


    /**
     * Get the "id" cV.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CVDTO> findOne(Long id);

    /**
     * Delete the "id" cV.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
