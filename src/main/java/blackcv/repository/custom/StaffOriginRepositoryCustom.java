package blackcv.repository.custom;

import blackcv.domain.StaffOrigin;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import java.util.List;

public interface StaffOriginRepositoryCustom {
    List<StaffOrigin> search(MultiValueMap<String, String> queryParams, Pageable pageable);

    Long countStaffOrigin(MultiValueMap<String, String> queryParams);
}
