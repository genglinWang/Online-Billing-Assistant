package cn.edu.sdu.ise.labs.model;

import lombok.Data;

import java.util.List;
/**
 * @author G.L. W
 */
@Data
public class Select<T> {
    public Select(List<T> dtolist)
    {
        this.setList(dtolist);
    }
    private List<T>list;
}
