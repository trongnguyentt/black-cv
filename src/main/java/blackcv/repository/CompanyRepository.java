package blackcv.repository;

import blackcv.domain.Company;
import blackcv.repository.custom.CompanyRepositoryCustom;
import blackcv.service.dto.CompanyDTO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Company entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, CompanyRepositoryCustom {

}
