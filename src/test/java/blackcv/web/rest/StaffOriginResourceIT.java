package blackcv.web.rest;

import blackcv.BlackcvApp;
import blackcv.domain.StaffOrigin;
import blackcv.repository.StaffOriginRepository;
import blackcv.service.StaffOriginService;
import blackcv.service.dto.StaffOriginDTO;
import blackcv.service.mapper.StaffOriginMapper;
import blackcv.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static blackcv.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StaffOriginResource} REST controller.
 */
@SpringBootTest(classes = BlackcvApp.class)
public class StaffOriginResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_JOB = "AAAAAAAAAA";
    private static final String UPDATED_JOB = "BBBBBBBBBB";

    private static final String DEFAULT_ADVANTAGES = "AAAAAAAAAA";
    private static final String UPDATED_ADVANTAGES = "BBBBBBBBBB";

    private static final String DEFAULT_DEFECT = "AAAAAAAAAA";
    private static final String UPDATED_DEFECT = "BBBBBBBBBB";

    private static final String DEFAULT_MORE = "AAAAAAAAAA";
    private static final String UPDATED_MORE = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    @Autowired
    private StaffOriginRepository staffOriginRepository;

    @Autowired
    private StaffOriginMapper staffOriginMapper;

    @Autowired
    private StaffOriginService staffOriginService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStaffOriginMockMvc;

    private StaffOrigin staffOrigin;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StaffOriginResource staffOriginResource = new StaffOriginResource(staffOriginService);
        this.restStaffOriginMockMvc = MockMvcBuilders.standaloneSetup(staffOriginResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StaffOrigin createEntity(EntityManager em) {
        StaffOrigin staffOrigin = new StaffOrigin()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .job(DEFAULT_JOB)
            .advantages(DEFAULT_ADVANTAGES)
            .defect(DEFAULT_DEFECT)
            .more(DEFAULT_MORE)
            .status(DEFAULT_STATUS);
        return staffOrigin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StaffOrigin createUpdatedEntity(EntityManager em) {
        StaffOrigin staffOrigin = new StaffOrigin()
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .job(UPDATED_JOB)
            .advantages(UPDATED_ADVANTAGES)
            .defect(UPDATED_DEFECT)
            .more(UPDATED_MORE)
            .status(UPDATED_STATUS);
        return staffOrigin;
    }

    @BeforeEach
    public void initTest() {
        staffOrigin = createEntity(em);
    }

    @Test
    @Transactional
    public void createStaffOrigin() throws Exception {
        int databaseSizeBeforeCreate = staffOriginRepository.findAll().size();

        // Create the StaffOrigin
        StaffOriginDTO staffOriginDTO = staffOriginMapper.toDto(staffOrigin);
        restStaffOriginMockMvc.perform(post("/api/staff-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staffOriginDTO)))
            .andExpect(status().isCreated());

        // Validate the StaffOrigin in the database
        List<StaffOrigin> staffOriginList = staffOriginRepository.findAll();
        assertThat(staffOriginList).hasSize(databaseSizeBeforeCreate + 1);
        StaffOrigin testStaffOrigin = staffOriginList.get(staffOriginList.size() - 1);
        assertThat(testStaffOrigin.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStaffOrigin.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testStaffOrigin.getJob()).isEqualTo(DEFAULT_JOB);
        assertThat(testStaffOrigin.getAdvantages()).isEqualTo(DEFAULT_ADVANTAGES);
        assertThat(testStaffOrigin.getDefect()).isEqualTo(DEFAULT_DEFECT);
        assertThat(testStaffOrigin.getMore()).isEqualTo(DEFAULT_MORE);
        assertThat(testStaffOrigin.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createStaffOriginWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = staffOriginRepository.findAll().size();

        // Create the StaffOrigin with an existing ID
        staffOrigin.setId(1L);
        StaffOriginDTO staffOriginDTO = staffOriginMapper.toDto(staffOrigin);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStaffOriginMockMvc.perform(post("/api/staff-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staffOriginDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StaffOrigin in the database
        List<StaffOrigin> staffOriginList = staffOriginRepository.findAll();
        assertThat(staffOriginList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStaffOrigins() throws Exception {
        // Initialize the database
        staffOriginRepository.saveAndFlush(staffOrigin);

        // Get all the staffOriginList
        restStaffOriginMockMvc.perform(get("/api/staff-origins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(staffOrigin.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].job").value(hasItem(DEFAULT_JOB)))
            .andExpect(jsonPath("$.[*].advantages").value(hasItem(DEFAULT_ADVANTAGES)))
            .andExpect(jsonPath("$.[*].defect").value(hasItem(DEFAULT_DEFECT)))
            .andExpect(jsonPath("$.[*].more").value(hasItem(DEFAULT_MORE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getStaffOrigin() throws Exception {
        // Initialize the database
        staffOriginRepository.saveAndFlush(staffOrigin);

        // Get the staffOrigin
        restStaffOriginMockMvc.perform(get("/api/staff-origins/{id}", staffOrigin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(staffOrigin.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.job").value(DEFAULT_JOB))
            .andExpect(jsonPath("$.advantages").value(DEFAULT_ADVANTAGES))
            .andExpect(jsonPath("$.defect").value(DEFAULT_DEFECT))
            .andExpect(jsonPath("$.more").value(DEFAULT_MORE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingStaffOrigin() throws Exception {
        // Get the staffOrigin
        restStaffOriginMockMvc.perform(get("/api/staff-origins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStaffOrigin() throws Exception {
        // Initialize the database
        staffOriginRepository.saveAndFlush(staffOrigin);

        int databaseSizeBeforeUpdate = staffOriginRepository.findAll().size();

        // Update the staffOrigin
        StaffOrigin updatedStaffOrigin = staffOriginRepository.findById(staffOrigin.getId()).get();
        // Disconnect from session so that the updates on updatedStaffOrigin are not directly saved in db
        em.detach(updatedStaffOrigin);
        updatedStaffOrigin
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .job(UPDATED_JOB)
            .advantages(UPDATED_ADVANTAGES)
            .defect(UPDATED_DEFECT)
            .more(UPDATED_MORE)
            .status(UPDATED_STATUS);
        StaffOriginDTO staffOriginDTO = staffOriginMapper.toDto(updatedStaffOrigin);

        restStaffOriginMockMvc.perform(put("/api/staff-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staffOriginDTO)))
            .andExpect(status().isOk());

        // Validate the StaffOrigin in the database
        List<StaffOrigin> staffOriginList = staffOriginRepository.findAll();
        assertThat(staffOriginList).hasSize(databaseSizeBeforeUpdate);
        StaffOrigin testStaffOrigin = staffOriginList.get(staffOriginList.size() - 1);
        assertThat(testStaffOrigin.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStaffOrigin.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testStaffOrigin.getJob()).isEqualTo(UPDATED_JOB);
        assertThat(testStaffOrigin.getAdvantages()).isEqualTo(UPDATED_ADVANTAGES);
        assertThat(testStaffOrigin.getDefect()).isEqualTo(UPDATED_DEFECT);
        assertThat(testStaffOrigin.getMore()).isEqualTo(UPDATED_MORE);
        assertThat(testStaffOrigin.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingStaffOrigin() throws Exception {
        int databaseSizeBeforeUpdate = staffOriginRepository.findAll().size();

        // Create the StaffOrigin
        StaffOriginDTO staffOriginDTO = staffOriginMapper.toDto(staffOrigin);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStaffOriginMockMvc.perform(put("/api/staff-origins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staffOriginDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StaffOrigin in the database
        List<StaffOrigin> staffOriginList = staffOriginRepository.findAll();
        assertThat(staffOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStaffOrigin() throws Exception {
        // Initialize the database
        staffOriginRepository.saveAndFlush(staffOrigin);

        int databaseSizeBeforeDelete = staffOriginRepository.findAll().size();

        // Delete the staffOrigin
        restStaffOriginMockMvc.perform(delete("/api/staff-origins/{id}", staffOrigin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StaffOrigin> staffOriginList = staffOriginRepository.findAll();
        assertThat(staffOriginList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
