package blackcv.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ReasonMapperTest {

    private ReasonMapper reasonMapper;

    @BeforeEach
    public void setUp() {
        reasonMapper = new ReasonMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(reasonMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(reasonMapper.fromId(null)).isNull();
    }
}
