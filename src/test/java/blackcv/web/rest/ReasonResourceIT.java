package blackcv.web.rest;

import blackcv.BlackcvApp;
import blackcv.domain.Reason;
import blackcv.repository.ReasonRepository;
import blackcv.service.ReasonService;
import blackcv.service.dto.ReasonDTO;
import blackcv.service.mapper.ReasonMapper;
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
 * Integration tests for the {@link ReasonResource} REST controller.
 */
@SpringBootTest(classes = BlackcvApp.class)
public class ReasonResourceIT {

    private static final String DEFAULT_DESCRIPTONS = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTONS = "BBBBBBBBBB";

    private static final String DEFAULT_REASON_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REASON_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    @Autowired
    private ReasonRepository reasonRepository;

    @Autowired
    private ReasonMapper reasonMapper;

    @Autowired
    private ReasonService reasonService;

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

    private MockMvc restReasonMockMvc;

    private Reason reason;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReasonResource reasonResource = new ReasonResource(reasonService);
        this.restReasonMockMvc = MockMvcBuilders.standaloneSetup(reasonResource)
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
    public static Reason createEntity(EntityManager em) {
        Reason reason = new Reason()
            .descriptons(DEFAULT_DESCRIPTONS)
            .reasonName(DEFAULT_REASON_NAME)
            .status(DEFAULT_STATUS);
        return reason;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reason createUpdatedEntity(EntityManager em) {
        Reason reason = new Reason()
            .descriptons(UPDATED_DESCRIPTONS)
            .reasonName(UPDATED_REASON_NAME)
            .status(UPDATED_STATUS);
        return reason;
    }

    @BeforeEach
    public void initTest() {
        reason = createEntity(em);
    }

    @Test
    @Transactional
    public void createReason() throws Exception {
        int databaseSizeBeforeCreate = reasonRepository.findAll().size();

        // Create the Reason
        ReasonDTO reasonDTO = reasonMapper.toDto(reason);
        restReasonMockMvc.perform(post("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isCreated());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeCreate + 1);
        Reason testReason = reasonList.get(reasonList.size() - 1);
        assertThat(testReason.getDescriptons()).isEqualTo(DEFAULT_DESCRIPTONS);
        assertThat(testReason.getReasonName()).isEqualTo(DEFAULT_REASON_NAME);
        assertThat(testReason.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createReasonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reasonRepository.findAll().size();

        // Create the Reason with an existing ID
        reason.setId(1L);
        ReasonDTO reasonDTO = reasonMapper.toDto(reason);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReasonMockMvc.perform(post("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReasons() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        // Get all the reasonList
        restReasonMockMvc.perform(get("/api/reasons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reason.getId().intValue())))
            .andExpect(jsonPath("$.[*].descriptons").value(hasItem(DEFAULT_DESCRIPTONS)))
            .andExpect(jsonPath("$.[*].reasonName").value(hasItem(DEFAULT_REASON_NAME)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }
    
    @Test
    @Transactional
    public void getReason() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        // Get the reason
        restReasonMockMvc.perform(get("/api/reasons/{id}", reason.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reason.getId().intValue()))
            .andExpect(jsonPath("$.descriptons").value(DEFAULT_DESCRIPTONS))
            .andExpect(jsonPath("$.reasonName").value(DEFAULT_REASON_NAME))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingReason() throws Exception {
        // Get the reason
        restReasonMockMvc.perform(get("/api/reasons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReason() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        int databaseSizeBeforeUpdate = reasonRepository.findAll().size();

        // Update the reason
        Reason updatedReason = reasonRepository.findById(reason.getId()).get();
        // Disconnect from session so that the updates on updatedReason are not directly saved in db
        em.detach(updatedReason);
        updatedReason
            .descriptons(UPDATED_DESCRIPTONS)
            .reasonName(UPDATED_REASON_NAME)
            .status(UPDATED_STATUS);
        ReasonDTO reasonDTO = reasonMapper.toDto(updatedReason);

        restReasonMockMvc.perform(put("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isOk());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeUpdate);
        Reason testReason = reasonList.get(reasonList.size() - 1);
        assertThat(testReason.getDescriptons()).isEqualTo(UPDATED_DESCRIPTONS);
        assertThat(testReason.getReasonName()).isEqualTo(UPDATED_REASON_NAME);
        assertThat(testReason.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingReason() throws Exception {
        int databaseSizeBeforeUpdate = reasonRepository.findAll().size();

        // Create the Reason
        ReasonDTO reasonDTO = reasonMapper.toDto(reason);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReasonMockMvc.perform(put("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReason() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        int databaseSizeBeforeDelete = reasonRepository.findAll().size();

        // Delete the reason
        restReasonMockMvc.perform(delete("/api/reasons/{id}", reason.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
