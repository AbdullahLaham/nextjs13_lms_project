// let l1,l2
// let newlist = new ListNode(0);
// let head = newlist;
// while (l1 !== null ,, l2!=null) {
//     if (l1.val > l2.val) {
//         newlist.next = l1;
//         l1 = l1.next
//     } else {
//         newlist.next = l2;

//         l2 = l2.next
//     }
// }



// var isPalindrome = function(s) {
//     s = s.toLowerCase();
//     let arr = ['a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' , 'k' 
//     , 'l' , 'm' , 'n' , 'o' , 'p' , 'q' , 'r' , 's' , 't' , 'u' , 'v' , 'w' , 'x' 
//     , 'y' , 'z' , 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' 
//     , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' 
//     , 'Y' , 'Z' , '0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9'];

//     s = s.split("").filter((chr) => arr.includes(chr) ).join("")
//     counter = Math.floor(s.length / 2) 
//     for (let i = 0; i < counter; i++) {
//         if (s[i] !== s[s.length - i - 1]) {
//             console.log(i, s[i], s[s.length - i - 1])
//             return false
//         }
        
//     }
//     return true
// };
// isPalindrome('A man, a plan, a canal: Panama')


let arr1 = []
let arr2 = []
for (let i = 0; i < nums.length; i++) {
    if (!arr1.includes(i)) {arr2.push(nums[i]); arr1.push(nums[i])}
    else arr2.push()
    
}