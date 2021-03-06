package blackcv.repository;

import blackcv.domain.CV;
import blackcv.repository.custom.CVRepositoryCustom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CV entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CVRepository extends JpaRepository<CV, Long> , CVRepositoryCustom {

}
