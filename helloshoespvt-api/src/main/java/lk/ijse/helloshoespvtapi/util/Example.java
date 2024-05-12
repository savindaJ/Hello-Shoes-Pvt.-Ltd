package lk.ijse.helloshoespvtapi.util;

import java.util.*;

/**
 * @author : savindaJ
 * @date : 5/12/2024
 * @since : 0.1.0
 **/
public class Example {
    public static void main(String[] args) {
        int[] ar = {5, 1, 98, 41};
        System.out.println(Arrays.toString(ar));    //[1, 5, 98, 41]

        sortArray(ar);
        System.out.println(Arrays.toString(ar));    //[1, 5, 41, 98]

    }

    public static void sortArray(int[] ar) {
//        int[] ar = {5, 1, 98, 41};
        //            0  1   2   3
        for (int i = 3; i < ar.length; i++) { // 4///////    1 2 3
            if (ar[i] > ar[i + 1]) {
                int temp = ar[i];
                ar[i] = ar[i + 1];
                ar[i + 1] = temp;
            }
        }
    }
}
