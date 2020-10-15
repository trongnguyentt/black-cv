package blackcv.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import blackcv.web.rest.TestUtil;

public class StaffOriginDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StaffOriginDTO.class);
        StaffOriginDTO staffOriginDTO1 = new StaffOriginDTO();
        staffOriginDTO1.setId(1L);
        StaffOriginDTO staffOriginDTO2 = new StaffOriginDTO();
        assertThat(staffOriginDTO1).isNotEqualTo(staffOriginDTO2);
        staffOriginDTO2.setId(staffOriginDTO1.getId());
        assertThat(staffOriginDTO1).isEqualTo(staffOriginDTO2);
        staffOriginDTO2.setId(2L);
        assertThat(staffOriginDTO1).isNotEqualTo(staffOriginDTO2);
        staffOriginDTO1.setId(null);
        assertThat(staffOriginDTO1).isNotEqualTo(staffOriginDTO2);
    }
}
