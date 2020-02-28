package blackcv.repository;

import blackcv.domain.Company;
import blackcv.repository.custom.CompanyRepositoryCustom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Company entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, CompanyRepositoryCustom {

}
