let l1,l2
let newlist = new ListNode(0);
let head = newlist;
while (l1 !== null || l2!=null) {
    if (l1.val > l2.val) {
        newlist.next = l1;
        l1 = l1.next
    } else {
        newlist.next = l2;

        l2 = l2.next
    }
}