import { Button, Dialog, Link } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { ethers } from "ethers";
import Text from "@/components/Text";
import TraderProfile from "@/components/TraderProfile";
import WalletInput from "@/components/WalletInput";
import Toast from "@/components/Toast";
import SimpleStorageAbi from "../json/SimpleStorageAbi.json";

const HelperText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  & > button {
    align-self: end;
  }
`;
const HelperButton = styled(Button)`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
`;

const Container = styled.div`
  min-width: 1024px;
  display: grid;
  grid-template-columns: 5fr 2fr;
  column-gap: 1rem;
`;

const ListContainer = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const InputContainer = styled.div`
  position: sticky;
  box-sizing: border-box;
  padding: 2rem;
  top: 2rem;
  border-radius: 1rem;
  height: 30rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
// Mock data
const data = [
  {
    name: "Doge",
    imageUrl:
      "https://img.danawa.com/prod_img/500000/665/093/img/15093665_1.jpg?shrink=330:330&_v=20210831091416",
    introduce: "완벽한 기법과 지표는 없습니다.",
    profit: 171845174,
    quantity: 174,
    follower: 21,
    id: "0x8626Ed51373a98ce30DdB8A043469548b1908A59",
  },
  {
    name: "Elon Musk",
    imageUrl:
      "https://www.fnnews.com/resource/media/image/2021/04/12/202104121212450632_l.jpg",
    introduce: "화성 갈끄니까~",
    profit: 171845174,
    quantity: 174,
    follower: 21,
    id: "0xd64Dc175606fAe83F9412b44298CC1632A6Fc979",
  },
  {
    name: "James3",
    imageUrl:
      "https://img.danawa.com/prod_img/500000/665/093/img/15093665_1.jpg?shrink=330:330&_v=20210831091416",
    introduce: "완벽한 기법과 지표는 없습니다.",
    profit: 171845174,
    quantity: 174,
    follower: 21,
    id: "0xd64Dc175606fAe83F9412b44298CC1632A6Fc979",
  },
  {
    name: "James4",
    imageUrl:
      "https://img.danawa.com/prod_img/500000/665/093/img/15093665_1.jpg?shrink=330:330&_v=20210831091416",
    introduce: "완벽한 기법과 지표는 없습니다.",
    profit: 171845174,
    quantity: 174,
    follower: 21,
    id: "0xd64Dc175606fAe83F9412b44298CC1632A6Fc979",
  },
  {
    name: "James5",
    imageUrl:
      "https://img.danawa.com/prod_img/500000/665/093/img/15093665_1.jpg?shrink=330:330&_v=20210831091416",
    introduce: "완벽한 기법과 지표는 없습니다.",
    profit: 171845174,
    quantity: 174,
    follower: 21,
    id: "0xd64Dc175606fAe83F9412b44298CC1632A6Fc979",
  },
  {
    name: "James6",
    imageUrl:
      "https://img.danawa.com/prod_img/500000/665/093/img/15093665_1.jpg?shrink=330:330&_v=20210831091416",
    introduce: "완벽한 기법과 지표는 없습니다.",
    profit: 171845174,
    quantity: 174,
    follower: 21,
    id: "0xd64Dc175606fAe83F9412b44298CC1632A6Fc979",
  },
];

function TradeTDCPage() {
  const formRef = useRef(null);
  const toastRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState(null);
  const handleHelperClose = () => {
    setOpen((prev) => !prev);
  };

  const updateEthers = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = formRef.current.getValues("receiver");
    const tempContract = new ethers.Contract(
      contractAddress,
      SimpleStorageAbi,
      signer
    );
    setContract(tempContract);
  };

  const handleConnectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const [value] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      formRef.current.setValue("sender", value);
    } else {
      toastRef.current.open();
    }
  };

  const handleProfileClick = (item) => () => {
    formRef.current.setValue("receiver", item.id);
    formRef.current.setName(item.name);
    updateEthers();
  };

  const handleSubmit = ({ message }) => {
    contract.set(message);
  };
  // reload the page to avoid any errors with chain change mid use of application
  const chainChangedHandler = () => window.location.reload();

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  // listen for account changes
  window.ethereum?.on("accountsChanged", accountChangedHandler);
  window.ethereum?.on("chainChanged", chainChangedHandler);

  return (
    <>
      <Text variant="h4" weight={600} gutterBottom>
        Traders
      </Text>
      <Dialog onClose={handleHelperClose} open={open}>
        <HelperText>
          <Text variant="h5" weight={600}>
            거래 순서 안내
          </Text>
          <Text>
            1.아래의 리스트에서 TDC를 전달하고자 하는 사람의 지갑 주소를
            복사하고set Address를 클릭합니다.
          </Text>
          <Text>
            2.이후 Connect Wallet을 통해 자신의 Metamask를 연결합니다.
          </Text>
          <Text>
            3.마지막으로 Contract할 내용을 작성하여 Update Contract를
            진행합니다!
          </Text>
<<<<<<< HEAD
=======
          <Text weight={600}>
            ※ 반드시 set Address를 진행한 이후 Connect Wallet을 진행해주세요.
          </Text>
>>>>>>> 43e0adcc0ed7f33a6c31b477e234c06891fa8dd8
          <Button
            variant="contained"
            color="success"
            onClick={handleHelperClose}
          >
            알겠습니다!
          </Button>
        </HelperText>
      </Dialog>
      {!open && (
        <HelperButton
          onClick={handleHelperClose}
          variant="contained"
          color="error"
          startIcon={<HelpIcon fontSize="large" />}
        >
          도움말
        </HelperButton>
      )}
      <Container>
        <ListContainer>
          {data.map((item) => (
            <TraderProfile
              {...item}
              onClick={handleProfileClick(item)}
              key={item.id}
            />
          ))}
        </ListContainer>
        <InputContainer>
          <WalletInput
            ref={formRef}
            onConnect={handleConnectWallet}
            onSubmit={handleSubmit}
          />
        </InputContainer>
      </Container>
      <Toast
        ref={toastRef}
        content="메타마스크 구글 익스텐션이 필요합니다."
        link={
          <Link
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
            target="_blank"
            color="error"
          >
            설치 페이지로 이동
          </Link>
        }
      />
    </>
  );
}

export default TradeTDCPage;
