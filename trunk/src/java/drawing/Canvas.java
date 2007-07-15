package drawing;

//import java.awt.*;
import javax.swing.*;

public class Canvas extends JApplet {
	public static final long serialVersionUID = 1;
	
	public void init() {
		
		//Panel myPanel = new Panel();
		MyCircle c1 = new MyCircle();
		//myPanel.add(c1);
		//getContentPane().add(myPanel);
		WindowUtilities.openInJFrame(c1, 200, 200);
	
		//JPanel panel = new ShapeExample();
		//panel.setBackground(Color.white);
		//getContentPane().add(panel);
	}
	
	public void browserResize(int bWidth, int bHeight){
		System.out.println("Browser resize-> " + bWidth + ", " + bHeight);
	}
}

