package cn.edu.sdu.ise.labs.dao;

import cn.edu.sdu.ise.labs.dto.query.AccountingQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.MonthQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.TimeQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.WordCloudQueryDTO;
import cn.edu.sdu.ise.labs.model.Accounting;
import cn.edu.sdu.ise.labs.model.WordCloud;
import cn.edu.sdu.ise.labs.model.timeSelect;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AccountingMapper {
    Accounting selectByPrimaryKey(Integer id);


    int insert(Accounting record);


    int updateByPrimaryKey(Accounting record);


    Accounting getByCode(
            @Param("accountingCode") String accountingCode,
            @Param("tenantCode") String tenantCode);


    /**
     * @param queryDTO
     * @return
     */
    Integer count(AccountingQueryDTO queryDTO);

    List<Accounting> list(@Param("queryDTO") AccountingQueryDTO queryDTO, @Param("offset") Integer offset, @Param("limit") Integer limit);

    void deleteByCodes(@Param("codeList") List<Integer> codeList);

    List<Accounting> listByCodes(
            @Param("codeList") List<String> codeList,
            @Param("tenantCode") String tenantCode);

    List<Accounting> listByName(
            @Param("accountingName") String accountingName,
            @Param("tenantCode") String tenantCode);

    List<timeSelect> timeSelect(
            @Param("timeQueryDTO") TimeQueryDTO timeQueryDTO);

    List<Accounting> monthList(@Param("queryDTO") MonthQueryDTO queryDTO, @Param("offset") Integer offset, @Param("limit") Integer limit
    );

    Integer countMonth(@Param("queryDTO") MonthQueryDTO queryDTO);

    List<WordCloud> wordCloud(@Param("queryDTO") WordCloudQueryDTO queryDTO);
}
