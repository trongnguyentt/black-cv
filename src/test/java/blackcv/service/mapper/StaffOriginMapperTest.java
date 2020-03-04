package blackcv.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class StaffOriginMapperTest {

    private StaffOriginMapper staffOriginMapper;

    @BeforeEach
    public void setUp() {
        staffOriginMapper = new StaffOriginMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(staffOriginMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(staffOriginMapper.fromId(null)).isNull();
    }
}
