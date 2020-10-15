package blackcv.service;

import blackcv.service.dto.StaffOriginDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

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
    Page<StaffOriginDTO> findAll(MultiValueMap<String, String> queryParams, Pageable pageable);


    List<StaffOriginDTO> listStaffNameAndEmail(String name, String email);

    /**
     * Get the "id" staffOrigin.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StaffOriginDTO> findOne(Long id);

    Optional<StaffOriginDTO> findOneByLogin(String login);

    /**
     * Delete the "id" staffOrigin.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
