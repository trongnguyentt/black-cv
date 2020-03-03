package blackcv.repository;

import blackcv.domain.StaffOrigin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StaffOrigin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StaffOriginRepository extends JpaRepository<StaffOrigin, Long> {

}
