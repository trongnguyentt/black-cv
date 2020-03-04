package blackcv.service.mapper;

import blackcv.domain.*;
import blackcv.service.dto.StaffOriginDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link StaffOrigin} and its DTO {@link StaffOriginDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StaffOriginMapper extends EntityMapper<StaffOriginDTO, StaffOrigin> {



    default StaffOrigin fromId(Long id) {
        if (id == null) {
            return null;
        }
        StaffOrigin staffOrigin = new StaffOrigin();
        staffOrigin.setId(id);
        return staffOrigin;
    }
}
