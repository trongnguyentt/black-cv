package blackcv.service.mapper;

import blackcv.domain.*;
import blackcv.service.dto.ReasonListDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ReasonList} and its DTO {@link ReasonListDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReasonListMapper extends EntityMapper<ReasonListDTO, ReasonList> {



    default ReasonList fromId(Long id) {
        if (id == null) {
            return null;
        }
        ReasonList reasonList = new ReasonList();
        reasonList.setId(id);
        return reasonList;
    }
}
