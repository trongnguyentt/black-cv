package blackcv.repository;

import blackcv.domain.Company;
import blackcv.repository.custom.CompanyRepositoryCustom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Company entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, CompanyRepositoryCustom {

    List<Company> findByNameContaining(String name);

}
