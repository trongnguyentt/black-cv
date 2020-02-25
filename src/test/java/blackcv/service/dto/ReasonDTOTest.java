package blackcv.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import blackcv.web.rest.TestUtil;

public class ReasonDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReasonDTO.class);
        ReasonDTO reasonDTO1 = new ReasonDTO();
        reasonDTO1.setId(1L);
        ReasonDTO reasonDTO2 = new ReasonDTO();
        assertThat(reasonDTO1).isNotEqualTo(reasonDTO2);
        reasonDTO2.setId(reasonDTO1.getId());
        assertThat(reasonDTO1).isEqualTo(reasonDTO2);
        reasonDTO2.setId(2L);
        assertThat(reasonDTO1).isNotEqualTo(reasonDTO2);
        reasonDTO1.setId(null);
        assertThat(reasonDTO1).isNotEqualTo(reasonDTO2);
    }
}
