package blackcv.service.mapper;

import blackcv.domain.*;
import blackcv.service.dto.ReasonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reason} and its DTO {@link ReasonDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReasonMapper extends EntityMapper<ReasonDTO, Reason> {



    default Reason fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reason reason = new Reason();
        reason.setId(id);
        return reason;
    }
}
