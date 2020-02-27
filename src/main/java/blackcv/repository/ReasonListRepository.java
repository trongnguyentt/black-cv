package blackcv.repository;

import blackcv.domain.ReasonList;
import blackcv.repository.custom.ReasonListRepositoryCustom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReasonList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReasonListRepository extends JpaRepository<ReasonList, Long>, ReasonListRepositoryCustom {

}
