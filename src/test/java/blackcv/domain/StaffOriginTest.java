package blackcv.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import blackcv.web.rest.TestUtil;

public class StaffOriginTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StaffOrigin.class);
        StaffOrigin staffOrigin1 = new StaffOrigin();
        staffOrigin1.setId(1L);
        StaffOrigin staffOrigin2 = new StaffOrigin();
        staffOrigin2.setId(staffOrigin1.getId());
        assertThat(staffOrigin1).isEqualTo(staffOrigin2);
        staffOrigin2.setId(2L);
        assertThat(staffOrigin1).isNotEqualTo(staffOrigin2);
        staffOrigin1.setId(null);
        assertThat(staffOrigin1).isNotEqualTo(staffOrigin2);
    }
}
