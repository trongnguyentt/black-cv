package blackcv.repository.custom;

import blackcv.domain.Company;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import java.util.List;

public interface CompanyRepositoryCustom {
    List<Company> search(MultiValueMap<String, String> queryParams, Pageable pageable);

    Long countCompany(MultiValueMap<String, String> queryParams);
}
