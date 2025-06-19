import React from "react";

type Props = {};

const DeleteAccount = (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Yêu cầu xóa tài khoản</h1>
      <p>
        Để xóa tài khoản của bạn, vui lòng gửi yêu cầu đến email hỗ trợ của
        chúng tôi tại{" "}
        <a href="mailto:" className="text-blue-500 hover:underline">
          <strong>hh.glorious@gmail.com</strong>
        </a>
        . Chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian sớm nhất.
      </p>
      <p className="mt-4">
        Lưu ý: Việc xóa tài khoản sẽ xóa tất cả dữ liệu liên quan đến tài khoản
        của bạn, bao gồm thông tin cá nhân, lịch sử giao dịch và các thông tin
        khác. Hãy chắc chắn rằng bạn đã sao lưu mọi thông tin cần thiết trước
        khi thực hiện yêu cầu này.
      </p>
      <p className="mt-4">
        Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, vui lòng liên hệ với
        chúng tôi qua email trên. Chúng tôi luôn sẵn sàng giúp đỡ bạn.
      </p>
      <p className="mt-4">
        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi hy vọng sẽ có cơ
        hội phục vụ bạn trong tương lai.
      </p>
      <p className="mt-4">
        Trân trọng,
        <br />
        Đội ngũ hỗ trợ khách hàng
      </p>
    </div>
  );
};

export default DeleteAccount;
