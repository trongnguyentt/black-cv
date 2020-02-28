package blackcv.repository.custom;

import blackcv.domain.CV;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import java.util.List;

public interface CVRepositoryCustom {
    List<CV> search(MultiValueMap<String, String> queryParams, Pageable pageable);

    List<CV> searchInHome(MultiValueMap<String, String> queryParams, Pageable pageable);

    Long countCV(MultiValueMap<String, String> queryParams);
}
