pragma solidity ^ 0.4 .15;

contract Token {
	uint256 public totalSupply;

	function balanceOf(address _owner) constant returns(uint256 balance);

	function allowance(address _owner, address _spender) constant returns(uint256 remaining);

	function transfer(address _to, uint256 _value) returns(bool success);

	function transferFrom(address _from, address _to, uint256 _value) returns(bool success);

	function approve(address _spender, uint256 _value) returns(bool success);

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract TTCToken is Token {

	mapping(address => uint256) balances;
	mapping(address => mapping(address => uint256)) allowed;

	function transferFrom(address _from, address _to, uint256 _value) returns(bool success) {
		if(balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
			balances[_to] += _value;
			balances[_from] -= _value;
			allowed[_from][msg.sender] -= _value;
			Transfer(_from, _to, _value);
			return true;
		} else {
			return false;
		}
	}

	function balanceOf(address _owner) constant returns(uint256 balance) {
		return balances[_owner];
	}

	function approve(address _spender, uint256 _value) returns(bool success) {
		allowed[msg.sender][_spender] = _value;
		Approval(msg.sender, _spender, _value);
		return true;
	}

	function allowance(address _owner, address _spender) constant returns(uint256 remaining) {
		return allowed[_owner][_spender];
	}

	string public constant symbol = "TTC";
	string public constant name = "Time Treaty Coin";
	uint8 public constant decimals = 18;

	address public creator;
	uint256 unit1 = 1 wei;
	uint256 unit2 = 1 szabo; // 1 * 10 ** 12
	uint256 unit3 = 1 finney; // 1 * 10 ** 15
	uint256 unit4 = 1 ether; // 1 * 10 ** 18
	uint256 public constant LOCKPERIOD_BASETEAM = 730 days;
	uint256 public TTCExchangeRate = 21000; // 1eth = 21000TTC  

	uint256 public ACCOUNT_VALUE_PRIVATEPLACEMENT = 45.5 * 100000000 * 0.02 * 10 ** 18; // 2% 
	uint256 public ACCOUNT_VALUE_PUBLICPLACEMENT1 = 45.5 * 100000000 * 0.02 * 10 ** 18; // 2%/
	uint256 public ACCOUNT_VALUE_PUBLICPLACEMENT2 = 45.5 * 100000000 * 0.02 * 10 ** 18; // 2%/
	uint256 public ACCOUNT_VALUE_PUBLICPLACEMENT3 = 45.5 * 100000000 * 0.02 * 10 ** 18; // 2%/
	uint256 public ACCOUNT_VALUE_PUBLICPLACEMENT4 = 45.5 * 100000000 * 0.02 * 10 ** 18; // 2%/
	uint256 public ACCOUNT_VALUE_DIGITALCURRENCYINVESTMENT = 45.5 * 100000000 * 0.2 * 10 ** 18; // 20% 
	uint256 public ACCOUNT_VALUE_GLOBALSEPARATION = 45.5 * 100000000 * 0.45 * 10 ** 18; // 45%  
	uint256 public ACCOUNT_VALUE_FINANCIALEXPENSES = 45.5 * 100000000 * 0.05 * 10 ** 18; // 5%  
	uint256 public ACCOUNT_VALUE_TEAMREWARDS = 45.5 * 100000000 * 0.2 * 10 ** 18; // 20% 

	address ACCOUNT_ADDRESS_DIGITALCURRENCYINVESTMENT = 0xc36Fa9330E1b5536f3e6e551AdA0C1468a70bCCe; 
	address ACCOUNT_ADDRESS_GLOBALSEPARATION = 0xe1c13AA09aC0479Fb9AF244298dFe26fEFdc30E0; 
	address ACCOUNT_ADDRESS_FINANCIALEXPENSES = 0xff0a7c80402A567B5197bC2bE494BBe28406562b; 
	address ACCOUNT_ADDRESS_TEAMREWARDS = 0x9eB25851935Af752110aA3B87449bE110d244C95; 

	uint256 public constant TTCStartTime0 = 1510146000; //GMT, 2017/11/04 13:00, 
	uint256 public constant TTCEndTime0 = 1510232400; //GMT, 2017/11/05 13:00, 

	uint256 public constant TTCStartTime1 = 1518699600; //GMT, 2018/02/15 13:00, 
	uint256 public constant TTCEndTime1 = 1518786000; //GMT, 2018/02/16 13:00, 

	uint256 public constant TTCStartTime2 = 1526389200; //GMT, 2018/05/15 13:00, 
	uint256 public constant TTCEndTime2 = 1526475600; //GMT, 2018/05/16 13:00, 

	uint256 public constant TTCStartTime3 = 1534338000; //GMT, 2018/08/15 13:00, 
	uint256 public constant TTCEndTime3 = 1534424400; //GMT, 2018/08/16 13:00, 

	uint256 public constant TTCStartTime4 = 1542286800; //GMT, 2018/11/15 13:00, 
	uint256 public constant TTCEndTime4 = 1542373200; //GMT, 201/11/16 13:00, 

	address ACCOUNT_ADDRESS_sales = 0x4CaA32A126F8d11db9A73Ea4cA51963F926b8E63; 
	address ACCOUNT_ADDRESS_development = 0x669DcE29Ac9a544b2c1796A7Ef7Ff81cc941277a; 
	address ACCOUNT_ADDRESS_rewards = 0xb30E483f25Be2bDF6918AC094EAa5A28a93e544e; 
	address ACCOUNT_ADDRESS_companydevelop = 0xdF8dCc2a82569820a75eA6E53BA0E0095514DfaE; 

	function TTCToken() {
		creator = msg.sender;
		totalSupply = ACCOUNT_VALUE_PRIVATEPLACEMENT + ACCOUNT_VALUE_PUBLICPLACEMENT1 + ACCOUNT_VALUE_PUBLICPLACEMENT2 + ACCOUNT_VALUE_PUBLICPLACEMENT3 + ACCOUNT_VALUE_PUBLICPLACEMENT4;
		balances[msg.sender] = ACCOUNT_VALUE_PRIVATEPLACEMENT + ACCOUNT_VALUE_PUBLICPLACEMENT1 + ACCOUNT_VALUE_PUBLICPLACEMENT2 + ACCOUNT_VALUE_PUBLICPLACEMENT3 + ACCOUNT_VALUE_PUBLICPLACEMENT4;
		balances[ACCOUNT_ADDRESS_DIGITALCURRENCYINVESTMENT] = ACCOUNT_VALUE_DIGITALCURRENCYINVESTMENT; //20%   
		balances[ACCOUNT_ADDRESS_GLOBALSEPARATION] = ACCOUNT_VALUE_GLOBALSEPARATION; //45%   
		balances[ACCOUNT_ADDRESS_FINANCIALEXPENSES] = ACCOUNT_VALUE_FINANCIALEXPENSES; //5% 
		balances[ACCOUNT_ADDRESS_TEAMREWARDS] = ACCOUNT_VALUE_TEAMREWARDS; //20%
	}

	function transfer(address _to, uint256 _value) returns(bool success) {
		if(balances[msg.sender] < _value) revert();
		if(balances[_to] + _value < balances[_to]) revert();
		if(balances[msg.sender] >= _value && _value > 0) {
			if(msg.sender == ACCOUNT_ADDRESS_TEAMREWARDS) {
				if(now < TTCStartTime0 + LOCKPERIOD_BASETEAM) {
					return false;
				}
			}
			if(msg.sender == creator) {
				totalSupply -= _value;

				if(now <= TTCEndTime0 && now >= TTCStartTime0) {
					if(ACCOUNT_VALUE_PRIVATEPLACEMENT < _value) revert();
					ACCOUNT_VALUE_PRIVATEPLACEMENT -= _value;
				} else if(now <= TTCEndTime1 && now >= TTCStartTime1) {
					if(ACCOUNT_VALUE_PUBLICPLACEMENT1 < _value) revert();
					ACCOUNT_VALUE_PUBLICPLACEMENT1 -= _value;
				} else if(now <= TTCEndTime2 && now >= TTCStartTime2) {
					if(ACCOUNT_VALUE_PUBLICPLACEMENT2 < _value) revert();
					ACCOUNT_VALUE_PUBLICPLACEMENT2 -= _value;
				} else if(now <= TTCEndTime3 && now >= TTCStartTime3) {
					if(ACCOUNT_VALUE_PUBLICPLACEMENT3 < _value) revert();
					ACCOUNT_VALUE_PUBLICPLACEMENT3 -= _value;
				} else if(now <= TTCEndTime4 && now >= TTCStartTime4) {
					if(ACCOUNT_VALUE_PUBLICPLACEMENT4 < _value) revert();
					ACCOUNT_VALUE_PUBLICPLACEMENT4 -= _value;
				} else {
					revert();
				}
			}

			balances[msg.sender] -= _value;
			balances[_to] += _value;
			Transfer(msg.sender, _to, _value);
			return true;
		} else {
			return false;
		}
	}

	function createTokens() payable {
		uint256 TTCAmount = 0;
		if(TTCAmount == 0) {
			TTCAmount = msg.value * TTCExchangeRate;
		}
		if(now <= TTCEndTime0 && now >= TTCStartTime0) {
			if(msg.value < 1 * unit4) revert(); 
			if(ACCOUNT_VALUE_PRIVATEPLACEMENT < TTCAmount) revert();
			balances[creator] -= TTCAmount;
			ACCOUNT_VALUE_PRIVATEPLACEMENT -= TTCAmount;
			totalSupply -= TTCAmount;
			balances[msg.sender] += TTCAmount;
		} else if(now <= TTCEndTime1 && now >= TTCStartTime1) {
			if(ACCOUNT_VALUE_PUBLICPLACEMENT1 < TTCAmount) revert();
			balances[creator] -= TTCAmount;
			ACCOUNT_VALUE_PUBLICPLACEMENT1 -= TTCAmount;
			totalSupply -= TTCAmount;
			balances[msg.sender] += TTCAmount;
		} else if(now <= TTCEndTime2 && now >= TTCStartTime2) {
			if(ACCOUNT_VALUE_PUBLICPLACEMENT2 < TTCAmount) revert();
			balances[creator] -= TTCAmount;
			ACCOUNT_VALUE_PUBLICPLACEMENT2 -= TTCAmount;
			totalSupply -= TTCAmount;
			balances[msg.sender] += TTCAmount;
		} else if(now <= TTCEndTime3 && now >= TTCStartTime3) {
			if(ACCOUNT_VALUE_PUBLICPLACEMENT3 < TTCAmount) revert();
			balances[creator] -= TTCAmount;
			ACCOUNT_VALUE_PUBLICPLACEMENT3 -= TTCAmount;
			totalSupply -= TTCAmount;
			balances[msg.sender] += TTCAmount;
		} else if(now <= TTCEndTime4 && now >= TTCStartTime4) {
			if(ACCOUNT_VALUE_PUBLICPLACEMENT4 < TTCAmount) revert();
			balances[creator] -= TTCAmount;
			ACCOUNT_VALUE_PUBLICPLACEMENT4 -= TTCAmount;
			totalSupply -= TTCAmount;
			balances[msg.sender] += TTCAmount;
		} else {
			revert();
		}
		Transfer(creator, msg.sender, TTCAmount);

		if(!ACCOUNT_ADDRESS_sales.send(msg.value * 15 / 100)) revert();
		if(!ACCOUNT_ADDRESS_development.send(msg.value * 40 / 100)) revert();
		if(!ACCOUNT_ADDRESS_rewards.send(msg.value * 10 / 100)) revert();
		if(!ACCOUNT_ADDRESS_companydevelop.send(msg.value * 35 / 100)) revert();
	}

	function initRate(uint256 rate) public {
		if(msg.sender != creator) revert();
		TTCExchangeRate = rate;
	}

	function lastToGold() {
		if(msg.sender != creator) revert();
		if(now > TTCEndTime0) {
			ACCOUNT_VALUE_GLOBALSEPARATION += ACCOUNT_VALUE_PRIVATEPLACEMENT;
			balances[ACCOUNT_ADDRESS_GLOBALSEPARATION] += ACCOUNT_VALUE_PRIVATEPLACEMENT;
			balances[creator] -= ACCOUNT_VALUE_PRIVATEPLACEMENT;
			Transfer(creator, ACCOUNT_ADDRESS_GLOBALSEPARATION, ACCOUNT_VALUE_PRIVATEPLACEMENT);
			totalSupply -= ACCOUNT_VALUE_PRIVATEPLACEMENT;
			ACCOUNT_VALUE_PRIVATEPLACEMENT = 0;
			if(now > TTCEndTime1) {
				ACCOUNT_VALUE_GLOBALSEPARATION += ACCOUNT_VALUE_PUBLICPLACEMENT1;
				balances[ACCOUNT_ADDRESS_GLOBALSEPARATION] += ACCOUNT_VALUE_PUBLICPLACEMENT1;
				balances[creator] -= ACCOUNT_VALUE_PUBLICPLACEMENT1;
				Transfer(creator, ACCOUNT_ADDRESS_GLOBALSEPARATION, ACCOUNT_VALUE_PUBLICPLACEMENT1);
				totalSupply -= ACCOUNT_VALUE_PUBLICPLACEMENT1;
				ACCOUNT_VALUE_PUBLICPLACEMENT1 = 0;
				if(now > TTCEndTime2) {
					ACCOUNT_VALUE_GLOBALSEPARATION += ACCOUNT_VALUE_PUBLICPLACEMENT2;
					balances[ACCOUNT_ADDRESS_GLOBALSEPARATION] += ACCOUNT_VALUE_PUBLICPLACEMENT2;
					balances[creator] -= ACCOUNT_VALUE_PUBLICPLACEMENT2;
					Transfer(creator, ACCOUNT_ADDRESS_GLOBALSEPARATION, ACCOUNT_VALUE_PUBLICPLACEMENT2);
					totalSupply -= ACCOUNT_VALUE_PUBLICPLACEMENT2;
					ACCOUNT_VALUE_PUBLICPLACEMENT2 = 0;
					if(now > TTCEndTime3) {
						ACCOUNT_VALUE_GLOBALSEPARATION += ACCOUNT_VALUE_PUBLICPLACEMENT3;
						balances[ACCOUNT_ADDRESS_GLOBALSEPARATION] += ACCOUNT_VALUE_PUBLICPLACEMENT3;
						balances[creator] -= ACCOUNT_VALUE_PUBLICPLACEMENT3;
						Transfer(creator, ACCOUNT_ADDRESS_GLOBALSEPARATION, ACCOUNT_VALUE_PUBLICPLACEMENT3);
						totalSupply -= ACCOUNT_VALUE_PUBLICPLACEMENT3;
						ACCOUNT_VALUE_PUBLICPLACEMENT3 = 0;
						if(now > TTCEndTime4) {
							ACCOUNT_VALUE_GLOBALSEPARATION += ACCOUNT_VALUE_PUBLICPLACEMENT4;
							balances[ACCOUNT_ADDRESS_GLOBALSEPARATION] += ACCOUNT_VALUE_PUBLICPLACEMENT4;
							balances[creator] -= ACCOUNT_VALUE_PUBLICPLACEMENT4;
							Transfer(creator, ACCOUNT_ADDRESS_GLOBALSEPARATION, ACCOUNT_VALUE_PUBLICPLACEMENT4);
							totalSupply -= ACCOUNT_VALUE_PUBLICPLACEMENT4;
							ACCOUNT_VALUE_PUBLICPLACEMENT4 = 0;
						}
					}
				}
			}

		}

	}

	function() payable {
		createTokens();
	}
}