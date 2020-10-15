package blackcv.repository.custom;

import blackcv.domain.Reason;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import java.util.List;

public interface ReasonRepositoryCustom {

    List<Reason> search(MultiValueMap<String, String> queryParams, Pageable pageable);

    Long countReason(MultiValueMap<String, String> queryParams);

}
