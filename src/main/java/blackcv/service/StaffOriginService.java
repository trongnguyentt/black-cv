package blackcv.service;

import blackcv.service.dto.StaffOriginDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link blackcv.domain.StaffOrigin}.
 */
public interface StaffOriginService {

    /**
     * Save a staffOrigin.
     *
     * @param staffOriginDTO the entity to save.
     * @return the persisted entity.
     */
    StaffOriginDTO save(StaffOriginDTO staffOriginDTO);

    /**
     * Get all the staffOrigins.
     *
     * @return the list of entities.
     */
    List<StaffOriginDTO> findAll();


    List<StaffOriginDTO> listStaffNameAndEmail(String name, String email);

    /**
     * Get the "id" staffOrigin.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StaffOriginDTO> findOne(Long id);

    /**
     * Delete the "id" staffOrigin.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
