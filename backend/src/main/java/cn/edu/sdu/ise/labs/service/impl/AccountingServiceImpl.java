package cn.edu.sdu.ise.labs.service.impl;

import cn.edu.sdu.ise.labs.dao.AccountingMapper;
import cn.edu.sdu.ise.labs.dto.AccountingDTO;
import cn.edu.sdu.ise.labs.dto.query.AccountingQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.MonthQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.TimeQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.WordCloudQueryDTO;
import cn.edu.sdu.ise.labs.model.*;
import cn.edu.sdu.ise.labs.service.AccountingService;
import cn.edu.sdu.ise.labs.service.utils.AccountingUtils;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.utils.PageUtils;
import cn.edu.sdu.ise.labs.utils.TokenContextHolder;
import cn.edu.sdu.ise.labs.vo.AccountingVO;
import cn.edu.sdu.ise.labs.vo.TimeSelectVO;
import cn.edu.sdu.ise.labs.model.timeSelect;
import cn.edu.sdu.ise.labs.vo.WordCloudVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
/**
 * @author G.L. W
 */
@Service
public class AccountingServiceImpl implements AccountingService {

    @Autowired
    private AccountingMapper accountingMapper;

    @Override
    public Inquiry<AccountingVO> listByPage(AccountingQueryDTO queryDTO) {
        if (queryDTO == null) {
            queryDTO = new AccountingQueryDTO();
        }

        queryDTO.setAccountingName(FormatUtils.makeFuzzySearchTerm(queryDTO.getAccountingName()));
        queryDTO.setYear(FormatUtils.makeFuzzySearchTerm(queryDTO.getYear()));
        queryDTO.setMonth(FormatUtils.makeFuzzySearchTerm(queryDTO.getMonth()));
        queryDTO.setDay(FormatUtils.makeFuzzySearchTerm(queryDTO.getDay()));
        Token token = TokenContextHolder.getToken();

        Integer size = accountingMapper.count(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getPage(), queryDTO.getPageSize(), size);
        Inquiry<AccountingVO> data=new Inquiry<>(pageUtils.getPage(), pageUtils.getPageSize(),
                pageUtils.getTotal(), new ArrayList<>());

        if (size == 0) {
            // 没有命中，则返回空数据。
            return data;
        }
        List<Accounting> list=accountingMapper.list(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());
        for(Accounting accounting:list){
            data.getList().add(AccountingUtils.convertToVO(accounting));
        }
        return data;
    }


    /**
     * 新建部门
     *
     * @param accountingDTO 部门输入对象
     * @return 部门编码
     */
    @Override
    public Integer addAccounting(AccountingDTO accountingDTO) {
        // 校验输入数据正确性
        AccountingUtils.validateAccounting(accountingDTO);
        // 创建实体对象，用以保存到数据库
        Accounting accounting = new Accounting();
        // 将输入的字段全部复制到实体对象中
        BeanUtils.copyProperties(accountingDTO, accounting);
        // 调用DAO方法保存到数据库表
        accountingMapper.insert(accounting);
        return accounting.getId();
    }

    /**
     * 更新部门数据
     *
     * @param accountingDTO 部门输入对象
     * @return 部门编码
     */
    @Override
    public Integer updateAccounting(AccountingDTO accountingDTO) {
        // 校验输入数据正确性
        Token token = TokenContextHolder.getToken();
        AccountingUtils.validateAccounting(accountingDTO);
        Assert.notNull(accountingDTO.getId(), "部门id不能为空");
        Accounting accounting = accountingMapper.selectByPrimaryKey(accountingDTO.getId());
        Assert.notNull(accounting, "没有找到部门，Id为：" + accountingDTO.getId());

        BeanUtils.copyProperties(accountingDTO, accounting);
        accounting.setUpdatedBy(token.getUserCode());
        accountingMapper.updateByPrimaryKey(accounting);
        return accounting.getId();
    }

    /**
     * 根据编码列表，批量删除部门
     *
     * @param ids 编码列表
     */
    @Override
    public void deleteByCodes(List<Integer> ids) {
        Assert.notEmpty(ids, "部门id列表不能为空");
        accountingMapper.deleteByCodes(ids);
    }

    @Override
    public Select<TimeSelectVO> timeSelect(TimeQueryDTO timeQueryDTO){
        Select<TimeSelectVO> data=new Select<>(new ArrayList<>());
        List<timeSelect> list=accountingMapper.timeSelect(timeQueryDTO);
        for (timeSelect timeSelect:list){
            TimeSelectVO timeSelectVO = new TimeSelectVO();
            BeanUtils.copyProperties(timeSelect,
                    timeSelectVO);
            data.getList().add(timeSelectVO);
        }
        return data;
    }

    @Override
    public Page<AccountingVO> listMonthByPage(MonthQueryDTO queryDTO) {
        if (queryDTO == null) {
            queryDTO = new MonthQueryDTO();
        }

        queryDTO.setMonth(FormatUtils.makeFuzzySearchTerm(queryDTO.getMonth()));
        Token token = TokenContextHolder.getToken();

        Integer size = accountingMapper.countMonth(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getPage(), queryDTO.getPageSize(), size);
        Page<AccountingVO> pageData = new Page<>(pageUtils.getPage(),
                pageUtils.getPageSize(), pageUtils.getTotal(), new ArrayList<>());
        if (size == 0) {
            // 没有命中，则返回空数据。
            return pageData;
        }

        List<Accounting> list = accountingMapper.monthList(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());
        for (Accounting accounting : list) {
            pageData.getList().add(AccountingUtils.convertToVO(accounting));
        }

        return pageData;
    }



    @Override
    public Select<WordCloudVO> listWordCloud(WordCloudQueryDTO queryDTO){
        if (queryDTO == null) {
            queryDTO = new WordCloudQueryDTO();
        }
        queryDTO.setAccountingName(FormatUtils.makeFuzzySearchTerm(queryDTO.getAccountingName()));
        Token token = TokenContextHolder.getToken();

        Select<WordCloudVO> data=new Select<>(new ArrayList<>());

        List<WordCloud> list=accountingMapper.wordCloud(queryDTO);
        for (WordCloud wordCloud :list){
            WordCloudVO wordCloudVO = new WordCloudVO();
            BeanUtils.copyProperties(wordCloud,
                    wordCloudVO);
            data.getList().add(wordCloudVO);
        }
        return data;
    }

}
