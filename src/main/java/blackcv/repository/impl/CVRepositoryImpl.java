package blackcv.repository.impl;

import blackcv.domain.CV;
import blackcv.repository.custom.CVRepositoryCustom;
import blackcv.service.dto.CVDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CVRepositoryImpl implements CVRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CV> search(MultiValueMap<String, String> queryParams, Pageable pageable) {
        Map<String, Object> values = new HashMap<>();
        String sql = "";
        if (queryParams.containsKey("login") && !queryParams.get("author").get(0).contains("ROLE_ADMIN")) {
            sql = "select C from CV C where C.status <> 0 and C.createdBy like :login";
            values.put("login", queryParams.get("login").get(0));
        } else {
            sql = "select C from CV C where C.status <> 0 ";
        }
        sql += createWhereQuery(queryParams, values);
        sql += createOrderQuery(queryParams);
        Query query = entityManager.createQuery(sql, CV.class);
        values.forEach(query::setParameter);
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());
        return query.getResultList();
    }

    @Override
    public List<CV> searchInHome(MultiValueMap<String, String> queryParams, Pageable pageable) {
        if (queryParams.containsKey("name") && queryParams.containsKey("phone") && queryParams.containsKey("email") && queryParams.containsKey("birthday")) {
            String sql = "select C from CV C where C.status <> 0 and lower(C.name) like lower(:name) and C.phone like :phone and C.email like :email and C.birthday like :birthday";
            Map<String, Object> values = new HashMap<>();
            values.put("name", queryParams.get("name").get(0));
            values.put("phone", queryParams.get("phone").get(0));
            values.put("email", queryParams.get("email").get(0));
            values.put("birthday", queryParams.get("birthday").get(0));
            Query query = entityManager.createQuery(sql, CV.class);
            values.forEach(query::setParameter);
            query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
            query.setMaxResults(pageable.getPageSize());
            return query.getResultList();
        }
        return null;
    }

    @Override
    public Long countCV(MultiValueMap<String, String> queryParams) {
        Map<String, Object> values = new HashMap<>();
        String sql = "";
        if (queryParams.containsKey("login") && !queryParams.get("author").get(0).contains("ROLE_ADMIN")) {
            sql = "select count(C) from CV C where C.status <> 0 and C.createdBy like :login";
            values.put("login", queryParams.get("login").get(0));
        } else {
            sql = "select count(C) from CV C where C.status <> 0";
        }
        sql += createWhereQuery(queryParams, values);
        Query query = entityManager.createQuery(sql, Long.class);
        values.forEach(query::setParameter);
        return (Long) query.getSingleResult();
    }

    private String createWhereQuery(MultiValueMap<String, String> queryParams, Map<String, Object> values) {
        String sql = "";
        if (queryParams.containsKey("name")) {
            sql += "and lower(C.name) like lower(:name)";
            values.put("name", queryParams.get("name").get(0));
        }

        if (queryParams.containsKey("phone")) {
            sql += "and lower(C.phone) like lower(:phone)";
            values.put("phone", queryParams.get("phone").get(0));
        }

        if (queryParams.containsKey("email")) {
            sql += "and lower(C.email) like lower(:email)";
            values.put("email", queryParams.get("email").get(0));
        }
        return sql;
    }

    private String createOrderQuery(MultiValueMap<String, String> queryParams) {
        String sql = " order by ";
        if (queryParams.containsKey("sort")) {
            List<String> orderByList = queryParams.get("sort");
            for (String i : orderByList) {
                sql += "C." + i.replace(",", " ") + ", ";
            }
            sql = sql.substring(0, sql.lastIndexOf(","));
        } else {
            sql += "C.createdDate desc";
        }
        return sql;
    }
}
