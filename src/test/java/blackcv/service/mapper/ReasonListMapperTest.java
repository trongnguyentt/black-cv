package blackcv.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ReasonListMapperTest {

    private ReasonListMapper reasonListMapper;

    @BeforeEach
    public void setUp() {
        reasonListMapper = new ReasonListMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(reasonListMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(reasonListMapper.fromId(null)).isNull();
    }
}
