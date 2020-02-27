package blackcv.repository.custom;

import blackcv.domain.ReasonList;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import java.util.List;

public interface ReasonListRepositoryCustom {

    List<ReasonList> search(MultiValueMap<String, String> queryParams, Pageable pageable);

    Long countReasonList(MultiValueMap<String, String> queryParams);

}
