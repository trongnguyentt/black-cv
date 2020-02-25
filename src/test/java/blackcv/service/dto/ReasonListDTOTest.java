package blackcv.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import blackcv.web.rest.TestUtil;

public class ReasonListDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReasonListDTO.class);
        ReasonListDTO reasonListDTO1 = new ReasonListDTO();
        reasonListDTO1.setId(1L);
        ReasonListDTO reasonListDTO2 = new ReasonListDTO();
        assertThat(reasonListDTO1).isNotEqualTo(reasonListDTO2);
        reasonListDTO2.setId(reasonListDTO1.getId());
        assertThat(reasonListDTO1).isEqualTo(reasonListDTO2);
        reasonListDTO2.setId(2L);
        assertThat(reasonListDTO1).isNotEqualTo(reasonListDTO2);
        reasonListDTO1.setId(null);
        assertThat(reasonListDTO1).isNotEqualTo(reasonListDTO2);
    }
}
