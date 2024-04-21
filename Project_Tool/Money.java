class Money {
    private int fAmount;
    private String fCurrency;

    public Money(int amount, String currency) {
        fAmount = amount;
        fCurrency = currency;
    }
    public Money add(Money other) {
        return new Money(fAmount + other.fAmount, fCurrency);
    }
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Money)) return false;
        Money other = (Money) obj;
        return this.fAmount == other.fAmount && this.fCurrency.equals(other.fCurrency);
    }
}

public class TestMoney {
    private Money f12CHF;
    private Money f14CHF;

    protected void setUp() {
        f12CHF = new Money(12, "CHF");
        f14CHF = new Money(14, "CHF");
    }
    public void testAddition() {
        Money result = f12CHF.add(f14CHF); 
        assert result.fAmount == 26; 
        assert result.fCurrency.equals("CHF");
    }
    public void testEquality() {
        assert f12CHF.equals(new Money(12, "CHF")); 
    }
}
