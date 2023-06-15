package cn.edu.sdu.ise.labs.service;

import cn.edu.sdu.ise.labs.dto.AccountingDTO;
import cn.edu.sdu.ise.labs.dto.query.AccountingQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.MonthQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.TimeQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.WordCloudQueryDTO;
import cn.edu.sdu.ise.labs.model.Inquiry;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.model.Select;
import cn.edu.sdu.ise.labs.vo.AccountingVO;
import cn.edu.sdu.ise.labs.vo.TimeSelectVO;
import cn.edu.sdu.ise.labs.vo.WordCloudVO;

import java.util.List;

/**
 * @author G.L. W
 */
public interface AccountingService {
    Inquiry<AccountingVO> listByPage(AccountingQueryDTO queryDTO);


    Integer addAccounting(AccountingDTO accountingDTO);

    /**
     * 更新账单数据
     *
     * @param accountingDTO 部门输入对象
     * @return 部门编码
     */
    Integer updateAccounting(AccountingDTO accountingDTO);

    /**
     * 根据编码列表，批量删除账单
     *
     * @param ids 编码列表
     */
    void deleteByCodes(List<Integer> ids);

    /**
     * @param
     * @return
     */
    Select<TimeSelectVO> timeSelect(TimeQueryDTO timeQueryDTO);

    Page<AccountingVO> listMonthByPage(MonthQueryDTO queryDTO);


    Select<WordCloudVO> listWordCloud(WordCloudQueryDTO queryDTO);
}
