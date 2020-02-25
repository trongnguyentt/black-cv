package blackcv.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class CVMapperTest {

    private CVMapper cVMapper;

    @BeforeEach
    public void setUp() {
        cVMapper = new CVMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(cVMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(cVMapper.fromId(null)).isNull();
    }
}
