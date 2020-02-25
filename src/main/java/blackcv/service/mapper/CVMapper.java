package blackcv.service.mapper;

import blackcv.domain.*;
import blackcv.service.dto.CVDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CV} and its DTO {@link CVDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CVMapper extends EntityMapper<CVDTO, CV> {



    default CV fromId(Long id) {
        if (id == null) {
            return null;
        }
        CV cV = new CV();
        cV.setId(id);
        return cV;
    }
}
