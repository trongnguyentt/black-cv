package blackcv.repository;

import blackcv.domain.StaffOrigin;
import blackcv.repository.custom.StaffOriginRepositoryCustom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the StaffOrigin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StaffOriginRepository extends JpaRepository<StaffOrigin, Long>, StaffOriginRepositoryCustom {
    Optional<StaffOrigin> findOneByEmailIgnoreCase(String email);

    List<StaffOrigin> findOneByEmail(String email);

}
